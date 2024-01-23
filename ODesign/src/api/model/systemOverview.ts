export interface ILease {
  expires: number;
  macaddr: string;
  ipaddr: string;
  hostname: string | boolean;
}

export interface ILease6 {
  expires: number;
  hostname: string;
  duid: string;
  ip6addr: string;
}

export interface IWan {
  proto: string;
  ipaddr: string;
  link: string;
  netmask: string;
  gwaddr: string;
  expires: number;
  uptime: number;
  ifname: string;
  dns: string[];
}

export interface IMemory {
  total: number;
  shared: number;
  free: number;
  cached: number;
  available: number;
  buffered: number;
}

export interface ISystemOverview {
  memcached?: string;
  swap?: {
    free: number;
    total: number;
  };
  ethinfo?: string;
  leases?: ILease[];
  userinfo?: string;
  wifinets?: any[]; // Replace with actual type if available
  leases6?: ILease6[];
  conncount?: number;
  connmax?: number;
  memory?: IMemory;
  uptime?: number;
  cpuinfo?: string;
  wan?: IWan;
  localtime?: string;
  cpuusage?: string;
  loadavg?: number[];
}
