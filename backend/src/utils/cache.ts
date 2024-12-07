class CacheStore {
  private static instance: CacheStore;
  private cache: Map<string, any>;

  private constructor() {
    this.cache = new Map<string, any>();
  }

  static getInstance(): CacheStore {
    if (!CacheStore.instance) {
      CacheStore.instance = new CacheStore();
    }
    return CacheStore.instance;
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);
  }

  get(key: string): any | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export default CacheStore.getInstance();
