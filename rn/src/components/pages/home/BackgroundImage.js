/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import React from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import Colors from '../../../../node_modules/react-native/Libraries/NewAppScreen/components/Colors';

const BackgroundImage = props => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('../../../../assets/images/boardgames.jpeg')}
    style={styles.background}
    imageStyle={styles.logo}></ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    paddingBottom: 200,
    paddingTop: 100,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
  logo: {
    opacity: 1,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: 0,
    marginBottom: 0,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
});

export default BackgroundImage;
