import React, { Component } from 'react';
import { dashToCapital } from 'utils/transforms';
import * as Serializers from 'serializers/index';

export default function serializerFor(modelName, store, data = {}) {
	let Serializer = Serializers[dashToCapital(modelName)];
	return Serializer ? new Serializer(store, data) : new Serializers['App'](store, data);
}