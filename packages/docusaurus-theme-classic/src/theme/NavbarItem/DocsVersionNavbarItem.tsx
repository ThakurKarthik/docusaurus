/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DefaultNavbarItem from './DefaultNavbarItem';
import {useActiveVersion, useLatestVersion} from '@theme/hooks/useDocs';
import type {Props} from '@theme/NavbarItem/DocsVersionNavbarItem';
import useDocsPreferredVersion from '../../utils/docsPreferredVersion/useDocsPreferredVersion';

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

export default function DocsVersionNavbarItem({
  label: staticLabel,
  to: staticTo,
  docsPluginId,
  ...props
}: Props): JSX.Element {
  const activeVersion = useActiveVersion(docsPluginId);
  const {preferredVersion} = useDocsPreferredVersion(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const version = activeVersion ?? preferredVersion ?? latestVersion;
  const label = staticLabel ?? version.label;
  const path = staticTo ?? getVersionMainDoc(version).path;
  return <DefaultNavbarItem {...props} label={label} to={path} />;
}
