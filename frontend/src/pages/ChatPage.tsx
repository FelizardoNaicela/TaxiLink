import { useEffect, useState } from 'react';

import axios from 'axios';

import { socket } from '../socket/socket';

import { useAuth } from '../contexts/AuthContext';

import { useParams } from 'react-router-dom';

import type { Group, Rating } from '../types/Group';

import {
  getGroups,
  getMyGroups,
} from '../services/groupService';
import { useNavigate }
from 'react-router-dom';

  
export function ChatPage() {
  const [message, setMessage] =
    useState('');

const navigate =
  useNavigate();
  const [messages, setMessages] =
    useState<any[]>([]);

    const { user, logout } =
  useAuth();

  const [group, setGroup] =
  useState<Group | null>(null);

  const [rating, setRating] =
  useState(0);

  const [isMember, setIsMember] =
  useState(false);

const [averageRating, setAverageRating] =
  useState(0);

  const [rideRequests, setRideRequests] =
  useState<any[]>([]);

const [requestDescription,
  setRequestDescription] =
  useState('');

  const [showRequests, setShowRequests] =
  useState(false);

  const { groupId } = useParams();

  async function loadGroup() {
  const allGroups =
    await getGroups();

  const currentGroup =
    allGroups.find(
      (group: Group) =>
        group.id === Number(groupId),
    ) || null;

  setGroup(currentGroup);

  if (!currentGroup) {
    return;
  }

  if (user?.role === 'DRIVER') {
    const myGroups =
      await getMyGroups();

    const member =
      myGroups.some(
        (group: Group) =>
          group.id === Number(groupId),
      );

    setIsMember(member);
  } else {
    setIsMember(false);
  }

  const myRating =
    currentGroup.ratings.find(
      (rating: Rating) =>
        rating.userId === user?.id,
    );

  if (myRating) {
    setRating(myRating.value);
  }
}

  useEffect(() => {
  socket.on(
    'newMessage',
    (newMessage) => {
      if (
        newMessage.groupId ===
        Number(groupId)
      ) {
        setMessages(
          (oldMessages) => [
            ...oldMessages,
            newMessage,
          ],
        );
      }
    },
  );

  return () => {
    socket.off('newMessage');
  };
}, [groupId]);

  useEffect(() => {
  async function loadMessages() {
    const response =
      await axios.get(
        `https://taxilink.onrender.com/messages/group/${groupId}`,
      );

    setMessages(response.data);
  }

  loadMessages();
  loadRideRequests();

}, [groupId]);

useEffect(() => {
  loadGroup();
  loadGroupRating();
}, [groupId, user]);

  async function sendMessage() {

  if (!message.trim()) {
    return;
  }

  const token =
    localStorage.getItem('token');

  await axios.post(
    'https://taxilink.onrender.com/messages',
    {
      content: message,
      groupId: Number(groupId),
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  );

  setMessage('');
}


  async function rateGroup(
  value: number,
) {
  const token =
    localStorage.getItem('token');

  await axios.post(
    'https://taxilink.onrender.com/ratings',
    {
      groupId: Number(groupId),
      value,
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  );

  setRating(value);

  loadGroupRating();
}

async function loadGroupRating() {
  const groups =
  await getGroups();

  const currentGroup =
    groups.find(
      (group: Group) =>
        group.id === Number(groupId),
    );

  if (!currentGroup?.ratings) {
    return;
  }

  const total =
    currentGroup.ratings.reduce(
      (
        sum: number,
        rating: any,
      ) => sum + rating.value,
      0,
    );

  const average =
    currentGroup.ratings.length
      ? total /
        currentGroup.ratings.length
      : 0;

  setAverageRating(average);
}

async function loadRideRequests() {
  const response =
    await axios.get(
      `https://taxilink.onrender.com/ride-requests/group/${groupId}`,
    );

  setRideRequests(response.data);
}

async function createRideRequest() {

  const token =
    localStorage.getItem('token');

  await axios.post(
    'https://taxilink.onrender.com/ride-requests',
    {
      description:
        requestDescription,

      groupId:
        Number(groupId),
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  );

  setRequestDescription('');

  loadRideRequests();
}

async function acceptRideRequest(
  requestId: number,
) {

  const token =
    localStorage.getItem('token');

  await axios.post(
    `https://taxilink.onrender.com/ride-requests/${requestId}/accept`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  );

  loadRideRequests();
}

async function finishRideRequest(
  requestId: number,
) {

  const token =
    localStorage.getItem('token');

  await axios.post(
    `https://taxilink.onrender.com/ride-requests/${requestId}/finish`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    },
  );

  loadRideRequests();
}


  return (
   <div className="chat-page">
        <div className="chat-header">
  <div>
    <h1>{group?.name}</h1>
    {group?.ownerId === user?.id && (

  <button
    onClick={() =>
      navigate(
        `/groups/${group?.id}/members`,
      )
    }
  >
    Gerir Membros
  </button>

)}

    <p>{group?.region}</p>
  </div>

  <div className="rating-section">
  <p>
    ⭐ {averageRating.toFixed(1)}
  </p>

  <div>
    {[1, 2, 3, 4, 5].map(
      (star) => (
        <button
          key={star}
          onClick={() =>
            rateGroup(star)
          }
        >
          {star <= rating
            ? '⭐'
            : '☆'}
        </button>
      ),
    )}
  </div>
</div>

  <button onClick={logout}
  className="logout-btn">
    Sair
  </button>
</div>


<div className="ride-requests">

 <div
  className="requests-header"
  onClick={() =>
    setShowRequests(
      !showRequests,
    )
  }
>
  <h3>
    Pedidos de Táxi
  </h3>

  <span>
    {showRequests
      ? '▲'
      : '▼'}
  </span>
</div>

{showRequests && (
  <>
  {user?.role === 'CLIENT' && (

    <div>

      <input
        value={requestDescription}
        onChange={(e) =>
          setRequestDescription(
            e.target.value,
          )
        }
        onKeyDown={(e) => {
  if (e.key === 'Enter') {
    createRideRequest();
  }
}}
        placeholder="
Descreva sua localização"
      />

      <button
        onClick={
          createRideRequest
        }
      >
        Solicitar Táxi
      </button>

    </div>

  )}

  {rideRequests.map(
    (request) => (

      <div
  key={request.id}
  className={
    request.clientId === user?.id
      ? 'request-card my-request'
      : 'request-card'
  }
>

        <strong>
          {request.client.name}
        </strong>

        <p>
          {request.description}
        </p>

        <p>
          Status:
          {' '}
          {request.status}
        </p>

        {request.driver && (
          <p>
            Motorista:
            {' '}
            {request.driver.name}
          </p>
        )}

        {user?.role === 'DRIVER' && isMember &&
          request.status ===
            'PENDING' && (

          <button
            onClick={() =>
              acceptRideRequest(
                request.id,
              )
            }
          >
            Aceitar
          </button>

        )}

        {user?.role === 'DRIVER' && isMember &&
 request.status === 'ACCEPTED' &&
 request.driver?.id === user.id && (

  <button
    onClick={() =>
      finishRideRequest(
        request.id,
      )
    }
  >
    Finalizar Corrida
  </button>

)}

      </div>

    ),
  )}
   </>
)}

</div>

      {user?.role === 'DRIVER' && isMember && (

<div className="messages-container">
  {messages.map((message) => (
    <div
      key={message.id}
      className={
        message.user.email ===
        user?.email
          ? 'my-message'
          : 'other-message'
      }
    >
      <strong>
        {message.user.name}
      </strong>

      <p>
        {message.content}
      </p>
    </div>
  ))}
</div>

)}

      {user?.role === 'DRIVER' && isMember && (

<div className="message-input">
  <input
  value={message}
  onChange={(e) =>
    setMessage(e.target.value)
  }
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }}
  placeholder="Escreva uma mensagem..."
/>

  <button
    onClick={sendMessage}
  >
    ➤
  </button>
</div>

)}

{(
  user?.role === 'CLIENT' ||
  (user?.role === 'DRIVER' &&
   !isMember)
) && (
  <p>
    Utilize apenas os pedidos de táxi.
    O chat é reservado aos membros deste grupo.
  </p>
)}
    </div>
  );
}