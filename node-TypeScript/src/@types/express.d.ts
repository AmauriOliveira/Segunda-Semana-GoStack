declare namespace Express {
  // vai anexar os dados abaixo ao request do express
  export interface Request {
    user: {
      id: string;
    };
  }
}
