import { modelFor } from 'store/model-for';


function loadContext(store, data) {
  return Array.isArray(data) ? pushAll(store, data) : pushRecord(store, data);
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
