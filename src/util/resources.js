import _ from "lodash";

/**
 * Find roleName from resource roles
 * @param {String} roleId
 * @param {String} resourceRoles
 *
 * @returns {String
 */
export function findRoleName(roleId, resourceRoles) {
  const selectedRole = _.find(resourceRoles, { id: roleId });

  return selectedRole?.name;
}
