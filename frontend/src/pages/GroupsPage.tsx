import {
  useEffect,
  useState,
} from 'react';

import GroupCard
from '../components/GroupCard';

import type { Group }
from '../types/Group';

import {
  getGroups,
  getMyGroups,
} from '../services/groupService';

import {
  useAuth,
} from '../contexts/AuthContext';

import {
  useNavigate,
} from 'react-router-dom';

function GroupsPage() {

  const [groups, setGroups] =
    useState<Group[]>([]);

  const [myGroups, setMyGroups] =
    useState<Group[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState('ALL');

  const [
    provinceFilter,
    setProvinceFilter,
  ] = useState('ALL');

  const [
    showFavorites,
    setShowFavorites,
  ] = useState(false);

  const [
    showMyGroups,
    setShowMyGroups,
  ] = useState(true);

  const [search, setSearch] =
    useState('');

  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  useEffect(() => {

    async function loadData() {

      try {

        const allGroups =
          await getGroups();

        setGroups(allGroups);

        if (
          user?.role === 'DRIVER'
        ) {

          const driverGroups =
            await getMyGroups();

          setMyGroups(
            driverGroups,
          );
        }

      } finally {

        setLoading(false);
      }
    }

    loadData();

  }, [user]);

  const groupsSource =
    user?.role === 'DRIVER' &&
    showMyGroups
      ? myGroups
      : groups;

  const sortedGroups =
    [...groupsSource].sort(
      (a, b) => {

        const avgA =
          a.ratings.length > 0
            ? a.ratings.reduce(
                (
                  sum,
                  rating,
                ) =>
                  sum +
                  rating.value,
                0,
              ) /
              a.ratings.length
            : 0;

        const avgB =
          b.ratings.length > 0
            ? b.ratings.reduce(
                (
                  sum,
                  rating,
                ) =>
                  sum +
                  rating.value,
                0,
              ) /
              b.ratings.length
            : 0;

        return avgB - avgA;
      },
    );

  const provinces = [
    'ALL',
    ...new Set(
      sortedGroups.map(
        (group) =>
          group.province,
      ),
    ),
  ];

  const filteredGroups =
    sortedGroups.filter(
      (group) => {

        const matchesType =
          filter === 'ALL'
            ? true
            : group.type ===
              filter;

        const matchesProvince =
          provinceFilter ===
          'ALL'
            ? true
            : group.province ===
              provinceFilter;

        const matchesSearch =
          group.name
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          group.region
            ?.toLowerCase()
            .includes(
              search.toLowerCase(),
            );

        return (
          matchesType &&
          matchesProvince &&
          matchesSearch
        );
      },
    );

  const favoriteGroups =
    filteredGroups.filter(
      (group) =>
        group.favorites?.some(
          (favorite) =>
            favorite.userId ===
            user?.id,
        ),
    );

  const groupsToShow =
    showFavorites
      ? favoriteGroups
      : filteredGroups;

  return (
  <div className="app">

    <div className="groups-sticky-header">

      <div className="page-header">

        <div>
          <h2>TaxiLink</h2>
          <p>{user?.email}</p>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Sair
        </button>

        {user?.role === 'DRIVER' && (
          <button
            className="create-group-btn"
            onClick={() =>
              navigate('/groups/create')
            }
          >
            + Criar Grupo
          </button>
        )}

      </div>

      {user?.role === 'DRIVER' && (

        <div className="filters">

          <button
            className={
              showMyGroups
                ? 'active-filter'
                : ''
            }
            onClick={() =>
              setShowMyGroups(true)
            }
          >
            Meus Grupos
          </button>

          <button
            className={
              !showMyGroups
                ? 'active-filter'
                : ''
            }
            onClick={() =>
              setShowMyGroups(false)
            }
          >
            Explorar
          </button>

        </div>

      )}

      <input
        className="search-input"
        type="text"
        placeholder="🔍 Pesquisar grupo ou região..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="filters">

        <button
          className={
            showFavorites
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setShowFavorites(
              !showFavorites,
            )
          }
        >
          Favoritos
        </button>

        <button
          className={
            filter === 'TAXI'
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setFilter('TAXI')
          }
        >
          Táxi
        </button>

        <button
          className={
            filter === 'MOTO'
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setFilter('MOTO')
          }
        >
          Moto
        </button>

        <button
          className={
            filter === 'TXOPELA'
              ? 'active-filter'
              : ''
          }
          onClick={() =>
            setFilter('TXOPELA')
          }
        >
          Txopela
        </button>

      </div>

      <hr />

      <div className="filters">

        {provinces.map(
          (province) => (

            <button
              key={province}
              className={
                provinceFilter === province
                  ? 'active-region'
                  : ''
              }
              onClick={() =>
                setProvinceFilter(
                  province,
                )
              }
            >
              {province === 'ALL'
                ? 'Todas Províncias'
                : province}
            </button>

          ),
        )}

      </div>

    </div>

    <div className="groups-content">

      <h3>
        {showMyGroups &&
        user?.role === 'DRIVER'
          ? 'Meus Grupos'
          : 'Grupos Disponíveis'}
      </h3>

      {loading ? (

        <p>Carregando grupos...</p>

      ) : (

        <>
          {groupsToShow.length === 0 && (
            <p>
              Nenhum grupo encontrado.
            </p>
          )}

          <div className="groups">

            {groupsToShow.map(
              (group) => (

                <GroupCard
                  key={group.id}
                  group={group}
                />

              ),
            )}

          </div>
        </>

      )}

    </div>

  </div>
);
}

export default GroupsPage;