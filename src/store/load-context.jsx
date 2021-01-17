import { adapterFor } from 'store/adapter-for';
import { modelFor } from 'store/model-for';
import { serializerFor } from 'store/serializer-for';


function loadContext(store, context) {
  return Array.isArray(context) ? pushAll(store, context) : pushRecord(store, context);
}


function pushAll(store, records) {
  return records.map(record => pushRecord(store, record));
}


function pushRecord(store, record) {
  let records = store[record.type] || [];
  let storeRecord = modelFor(store.models, record.type, store, record)
  records.push(storeRecord);
  return store[record.type] = records;
}

export { loadContext };
