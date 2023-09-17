export interface IImage {
  name: string;
  data: string;
  contentType: string;
}

export interface IStory {
  story: string;
  authorName: string;
  authorToken: string;
}

export interface IHandSeries {
  name: string;
  desc: string;
  images: IImage[];
  authorName: string;
  authorToken: string;
  authorEmail?: string;
  story?: IStory[];
}
