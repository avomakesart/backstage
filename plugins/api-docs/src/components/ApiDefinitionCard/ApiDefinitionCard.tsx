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

import { ApiEntity } from '@backstage/catalog-model';
import { InfoCard } from '@backstage/core';
import { BackstageTheme } from '@backstage/theme';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { ApiDefinitionWidget } from '../ApiDefinitionWidget';

const useStyles = makeStyles<BackstageTheme>(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: 0,
  },
  cardRoot: {
    flex: '1 1 auto',
  },
}));

type Props = {
  title?: string;
  apiEntity?: ApiEntity;
};

export const ApiDefinitionCard = ({ title, apiEntity }: Props) => {
  const classes = useStyles();

  if (!apiEntity) {
    return (
      <InfoCard title={title}>
        <Alert severity="error">Could not fetch the API</Alert>
      </InfoCard>
    );
  }

  const type = apiEntity.spec?.type || '';
  const definition = apiEntity.spec?.definition || '';

  return (
    <InfoCard
      title={title}
      subheader={type}
      className={classes.root}
      cardClassName={classes.cardRoot}
    >
      <ApiDefinitionWidget type={type} definition={definition} />
    </InfoCard>
  );
};