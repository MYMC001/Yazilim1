export interface Job {
  id: string;
  type: Type;
  title: string;
  description: string;
  location: string;
  postedAt: string;
  isFeatured : boolean;
};

export interface Image {
  id: string;
  url: string;
}

export interface Field {
  id: string;
  label: string;
  imageUrl: string;

};

export interface Type {
  id: string;
  name: string;
  field: Field;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
