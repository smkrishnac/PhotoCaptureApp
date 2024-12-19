export type RootStackParamList = {
    Photos: undefined;
    Camera: undefined;
    Preview: { photo: PhotoType };
  };

  export type PhotoType = {
    id: string;
    name: string;
    thumbnail: string;
    fullPath: string;
    capturedTime: string;
    size: string;
  };
