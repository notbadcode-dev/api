SELECT usersLinks.id AS userLinkId,
    usersLinks.name AS name,
    links.link AS link,
    links.createdAt AS linkCreateDate,
    groups.id AS groupId,
    groups.name AS groupName,
    groups.description AS groupDescription
FROM usersLinks
    LEFT OUTER JOIN links ON(links.id = usersLinks.id)
    LEFT OUTER JOIN groupsLinks ON(groupsLinks.linkId = usersLinks.linkId)
    LEFT OUTER JOIN groups ON(groups.id = groupsLinks.groupId)
WHERE usersLinks.userId = 1
    AND usersLinks.active = 1
ORDER BY groupName ASC;
SELECT *
FROM groupsLinks;
SELECT *
FROM users
WHERE userName = "notbadcode.dev@gmail.com"
    and paraphrase = "hola-mundo-dev-zone"