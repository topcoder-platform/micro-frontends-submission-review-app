/**
 * Reducer to process actions related to challenge resources
 */
import {
  LOAD_CHALLENGE_RESOURCES_SUCCESS,
  LOAD_CHALLENGE_RESOURCES_PENDING,
  LOAD_CHALLENGE_RESOURCES_FAILURE,
  LOAD_RESOURCE_ROLES_PENDING,
  LOAD_RESOURCE_ROLES_SUCCESS,
  LOAD_RESOURCE_ROLES_FAILURE,
} from "../config/constants";

const initialState = {
  isResourceLoading: true,
  isResourceRoleLoading: true,
  resourceRoles: [],
  roles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHALLENGE_RESOURCES_SUCCESS:
      return { ...state, roles: action.roles, isResourceLoading: false };
    case LOAD_CHALLENGE_RESOURCES_PENDING:
      return { ...state, isResourceLoading: true, roles: [] };
    case LOAD_CHALLENGE_RESOURCES_FAILURE:
      return { ...state, isResourceLoading: false };
    case LOAD_RESOURCE_ROLES_SUCCESS:
      return {
        ...state,
        resourceRoles: action.resourceRoles,
        isResourceRoleLoading: false,
      };
    case LOAD_RESOURCE_ROLES_PENDING:
      return { ...state, isResourceRoleLoading: true };
    case LOAD_RESOURCE_ROLES_FAILURE:
      return { ...state, isResourceRoleLoading: false };
    default:
      return state;
  }
}
