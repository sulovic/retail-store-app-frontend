export type AuthUser = {
  userId?: number;
  firstName: string;
  lastName: string;
  email: string;
  iat?: number;
  exp?: number;
  roles: { roleId: number; roleName: string };
};


export type LoginData = {
  type: "password" | "google";
  email?: string;
  password?: string;
  credential?: string;
};

export type AuthContextType = {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  isDarkMode: boolean | null;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogin: (data: LoginData) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleRefreshToken: () => Promise<string | undefined>;
};

export type ParamsContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NavbarLinks = {
  label: string;
  image: string;
  href: string;
  desc: string;
  minRole: number;
  sublinks: {
    label: string;
    image: string;
    href: string;
    desc: string;
    minRole: number;
  }[];
};

export type ModalProps = {
  onOK: () => void;
  onCancel: () => void;
  title: string;
  question: string;
};

export  type Product = {
  productId: number;
  productBarcode: string;
  productName: string;
  productPrice: number;
  productDesc: string | null;
  productImage: string | null;
}

export type PaginationType = {
  page: number;
  limit: number;
  count: number;
}

export type FilterType= {
  productName?: string;
  productBarcode?: string;
  };