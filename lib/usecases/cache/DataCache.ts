var cache = require("memory-cache");
export class DataCache {
   static async get(key: any) {
    let cachedData = await cache.get(key); 
    if (!cachedData) {
      console.info("DataCache.get",`expired or no data found in cache for key ${key} `);
    } 
    return cachedData;
  }
  static async save(key: any, data: any,interval:number = 10000) {
    const millisecondsToLive = 1000 * 60 * interval; 
    let cachedData = await cache.get(key);
    if (!cachedData) {
    await cache.put(key, data,millisecondsToLive);
    console.info("DataCache.save",`Failed to saved to cache, key: ${key}`);
    }
  }
}