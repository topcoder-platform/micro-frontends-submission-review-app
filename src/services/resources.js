/**
 * Fetching Resources Service
 *
 */
import axios from "axios";
import config from "../../config";
import _ from "lodash";

/**
 *
 * @param {String} tokenV3 login token
 * @returns {Promise<{}>} Roles
 */
export const getRoles = (tokenV3) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.TC_RESOURCES_SERVICE_URL}/resource-roles`, {
    headers: { Authorization: `Bearer ${tokenV3}` },
  });
};

/**
 *
 * @param {String} tokenV3 login user's token
 * @param {Number} memberId memberId
 * @param {String} roleId roleId
 * @returns {Promise<{object[]}>} Challenges by roleId
 */
export const getMyChallengesByRoleId = (tokenV3, memberId, roleId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(
    `${config.TC_RESOURCES_SERVICE_URL}/resources/${memberId}/challenges`,
    {
      headers: { Authorization: `Bearer ${tokenV3}` },
      params: {
        resourceRoleId: roleId,
      },
    }
  );
};

/**
 *
 * @param {Array} roles
 * @returns {Object} Map of roleName to roleId
 */
export const getRelevantResourceRolesMap = (roles) => {
  if (roles) {
    const relevantRoles = getRelevantRoles();
    const filteredRoles = _.filter(roles, (role) => {
      return _.includes(relevantRoles, role.name);
    });
    let roleMap = {};
    _.forEach(filteredRoles, (filteredRole) => {
      roleMap[filteredRole.name] = filteredRole.id;
    });
    return roleMap;
  }
  return roles;
};

/**
 * @returns {Array<String>} Relevant roles
 */
export const getRelevantRoles = () => {
  return ["Submitter", "Copilot", "Reviewer"];
};

/**
 *
 * @param {String} tokenV3 login user token
 * @param {Number} memberId memberId of logged in user
 * @param {Object} rolesMap role name to roleId map
 * @returns {Object} challenges by role names
 */
export const getMyChallengesForRelevantRoles = (
  tokenV3,
  memberId,
  rolesMap
) => {
  const relevantRoles = getRelevantRoles();
  let myChallengesByRolesPromises = [];
  _.forEach(relevantRoles, (role) => {
    myChallengesByRolesPromises.push(
      getMyChallengesByRoleId(tokenV3, memberId, rolesMap[role])
    );
  });
  return myChallengesByRolesPromises;
};
