/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Box, Grid, Link, Tooltip, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { InfoCard } from '@backstage/core';
import { entityRouteParams } from '@backstage/plugin-catalog';
import {
  Entity,
  GroupEntity,
  RELATION_CHILD_OF,
  RELATION_PARENT_OF,
} from '@backstage/catalog-model';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GroupIcon from '@material-ui/icons/Group';
import { Link as RouterLink, generatePath } from 'react-router-dom';

const GroupLink = ({
  groupName,
  index = 0,
  entity,
}: {
  groupName: string;
  index?: number;
  entity: Entity;
}) => (
  <>
    {index >= 1 ? ', ' : ''}
    <Link
      component={RouterLink}
      to={generatePath(
        `/catalog/:namespace/group/${groupName}`,
        entityRouteParams(entity),
      )}
    >
      [{groupName}]
    </Link>
  </>
);

const CardTitle = ({ title }: { title: string }) => (
  <Box display="flex" alignItems="center">
    <GroupIcon fontSize="inherit" />
    <Box ml={1}>{title}</Box>
  </Box>
);

export const GroupProfileCard = ({
  entity: group,
  variant,
}: {
  entity: GroupEntity;
  variant: string;
}) => {
  const {
    metadata: { name, description },
  } = group;
  const parent = group?.relations
    ?.filter(r => r.type === RELATION_CHILD_OF)
    ?.map(group => group.target.name)
    .toString();

  const childrens = group?.relations
    ?.filter(r => r.type === RELATION_PARENT_OF)
    ?.map(group => group.target.name);

  if (!group) return <Alert severity="error">User not found</Alert>;

  return (
    <InfoCard
      title={<CardTitle title={name} />}
      subheader={description}
      variant={variant}
    >
      <Grid container spacing={3}>
        <Grid item>
          {parent ? (
            <Typography variant="subtitle1">
              <Box display="flex" alignItems="center">
                <Tooltip title="Group Parent">
                  <AccountTreeIcon fontSize="inherit" />
                </Tooltip>
                <Box ml={1} display="inline">
                  <GroupLink groupName={parent} entity={group} />
                </Box>
              </Box>
            </Typography>
          ) : null}
          {childrens?.length ? (
            <Typography variant="subtitle1">
              <Box display="flex" alignItems="center">
                <Tooltip title="Parent of">
                  <GroupIcon fontSize="inherit" />
                </Tooltip>
                <Box ml={1} display="inline">
                  {childrens.map((children, index) => (
                    <GroupLink
                      groupName={children}
                      entity={group}
                      index={index}
                      key={children}
                    />
                  ))}
                </Box>
              </Box>
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </InfoCard>
  );
};