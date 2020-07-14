import React, { Component } from 'react';
import { dashToCapital } from 'utils/transforms';
import * as Models from 'models/index';

export default function modelFor(modelName, store, data = {}) {
	return new Models[dashToCapital(modelName)](modelName, store, data);
}