export class CheckAPIService {
  private static apiCache = new Map<string, boolean | null>(); // Cache cho từng API endpoint
  
  /**
   * 🔍 Kiểm tra API có sẵn không bằng cách thử gọi endpoint
   */
  static async checkApiAvailability(baseUrl: string, endpoint: string = '/getAll'): Promise<boolean> {
    const cacheKey = `${baseUrl}${endpoint}`;
    
    // Nếu đã kiểm tra rồi, return cache
    if (this.apiCache.has(cacheKey) && this.apiCache.get(cacheKey) !== null) {
      return this.apiCache.get(cacheKey)!;
    }

    try {
      console.log(`🔍 Checking API availability for: ${baseUrl}${endpoint}`);
      
      // Thử gọi API với timeout ngắn
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      // Nếu response ok, API có sẵn
      const isAvailable = response.ok;
      this.apiCache.set(cacheKey, isAvailable);
      console.log(`✅ API ${baseUrl} is available:`, isAvailable);
      
      return isAvailable;
      
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`❌ API check failed for ${baseUrl}:`, error.message);
      } else {
        console.warn(`❌ API check failed for ${baseUrl}:`, error);
      }
      
      this.apiCache.set(cacheKey, false);
      return false;
    }
  }

  /**
   * 🔧 Utility methods
   */
  static async isApiAvailable(baseUrl: string, endpoint?: string): Promise<boolean> {
    return await this.checkApiAvailability(baseUrl, endpoint);
  }
  
  static resetApiCheck(baseUrl?: string): void {
    if (baseUrl) {
      // Reset cache cho một API cụ thể
      const keysToDelete = Array.from(this.apiCache.keys()).filter(key => key.startsWith(baseUrl));
      keysToDelete.forEach(key => this.apiCache.delete(key));
    } else {
      // Reset tất cả cache
      this.apiCache.clear();
    }
  }
  
  static isMockMode(baseUrl: string): boolean {
    const cacheKey = `${baseUrl}/getAll`;
    return this.apiCache.get(cacheKey) === false;
  }
}