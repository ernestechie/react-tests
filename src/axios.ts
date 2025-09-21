import axios from "axios";

type HttpMethod = "get" | "post" | "patch" | "delete";
type HttpCachePolicy = "network-only" | "network-first" | "cache-first";

interface HttpClientProps {
  method?: HttpMethod;
  url: string;
  dataKey?: string;
  useCache?: boolean;
  cacheExpiry?: Date;
  cachePolicy?: HttpCachePolicy;
}

type HttpClientReturn = {
  data: Record<string, any>;
  fromCache: boolean;
  message: string;
  expiry: number;
};

const baseUrl = process.env?.REACT_APP_BASE_URL;

export const httpClient = async ({
  method = "get",
  url = "",
  useCache = false,
  cachePolicy = "network-first",
  cacheExpiry,
  dataKey = "data",
}: HttpClientProps) => {
  const lsJsonData = getDataFromCache(dataKey);
  // Check local storage cache
  if (useCache && lsJsonData) {
    return lsJsonData;
  }

  try {
    const res = await axios.request({
      method,
      url: `${baseUrl}/${url}`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const apiData = res?.data?.data || {};

    console.log(apiData);

    // Persist item to local storage (Cache)
    if (useCache && apiData && typeof apiData === "object") {
      const dataToStore = apiData?.[dataKey];
      console.log("Data_to_store", dataToStore);
      await storeDataInCache(dataToStore, dataKey);
    }

    return {
      data: apiData?.[dataKey] ?? apiData ?? {},
      fromCache: useCache,
      message: apiData?.message || "",
    };
  } catch (err) {
    throw err;
  }
};

// This strategy would offer us large performance gains but will only be useful for data that is highly unlikely to change, think populating a country or language dropdown.
const getDataFromCache = (dataKey: string) => {
  if (!dataKey) throw new Error("dataKey is required to get data from cache");

  const lsJsonData = localStorage.getItem(dataKey);

  if (!lsJsonData) return null;

  const lsData = JSON.parse(lsJsonData);

  if (lsData?.data && lsData?.fromCache) {
    const now = new Date();
    const cacheExpiry = lsData?.expiry;
    const cacheExpiryTime = new Date(cacheExpiry);

    console.log("CACHE_EXPIRY_TIME", cacheExpiryTime);

    // If the expiry time in the cache has passed current time
    if (cacheExpiryTime < now) {
      console.log("CACHE_EXPIRED");
      return null;
    }

    return lsData as HttpClientReturn;
  }

  console.log("LS_JSON_DATA", lsJsonData);

  return null;
};

const storeDataInCache = async (data: any, dataKey: string) => {
  if (!dataKey) throw new Error("dataKey is required to store data in cache");

  try {
    const minuteInMilliseconds = 60 * 2 * 1000; // 2 minutes
    const cacheData: HttpClientReturn = {
      data,
      fromCache: true,
      message: "",
      expiry: new Date().getTime() + minuteInMilliseconds,
    };

    const stringifyData = JSON.stringify(cacheData);
    localStorage.setItem(dataKey, stringifyData);

    console.log("DATA_STORED_IN_LOCAL_STORAGE_CACHE");
  } catch (err) {
    throw err;
  }
};
