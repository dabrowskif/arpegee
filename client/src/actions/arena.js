import * as api from '../api';

import {
  END_LOADING_ARENA, END_LOADING_MONSTER,
  GET_ARENA, REPLACE_MONSTER, SET_FIGHT_LOG,
  START_LOADING_ARENA, START_LOADING_MONSTER, UPDATE_CHARACTER,
} from '../constants/actionTypes';

// TODO think about usefulness of this function
export const createMonster = (characterLevel, characterId) => async () => {
  try {
    await api.createMonster(characterLevel, characterId);
  } catch (error) {
    console.log(error);
  }
};

export const getMonsters = (characterId, characterLevel) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARENA });

    const { data } = await api.getMonsters(characterId, characterLevel);
    const isMonsterLoading = data.result.map(() => false);

    dispatch({ type: GET_ARENA, payload: { data, isMonsterLoading } });
    dispatch({ type: END_LOADING_ARENA });
  } catch (error) {
    console.log(error);
  }
};

export const resetMonsters = (characterId, characterLevel) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_ARENA });

    const { data } = await api.resetMonsters(characterId, characterLevel);
    const isMonsterLoading = data.result.map(() => false);

    dispatch({ type: GET_ARENA, payload: { data, isMonsterLoading } });
    dispatch({ type: END_LOADING_ARENA });
  } catch (error) {
    console.log(error);
  }
};

export const fightMonster = (monsterId, index) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_MONSTER, index });

    const { data } = await api.fightMonster(monsterId);
    const { monster, updatedCharacter, fightLog } = data.result;

    dispatch({ type: REPLACE_MONSTER, payload: { monster, index } });
    dispatch({ type: END_LOADING_MONSTER, index });
    dispatch({ type: SET_FIGHT_LOG, payload: fightLog });

    await dispatch({ type: UPDATE_CHARACTER, payload: updatedCharacter });
  } catch (error) {
    console.log(error);
  }
};
