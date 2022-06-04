export function setUpFetchStub(data: any): (url: string) => Promise<any> {
  return function(url: string) {
    return new Promise(resolve => {
      resolve({
        ok: true,
        json: () => {
          return Promise.resolve(data);
        }
      })
    });
  };
}