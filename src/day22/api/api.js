export const api = {
  gifts: () =>
    new Promise((resolve, reject) => {
      try {
        const storedValueLS = localStorage.getItem("gifts");
        const giftsLS = storedValueLS
          ? JSON.parse(storedValueLS)
          : defaultValue;
        setTimeout(
          () =>
            resolve({
              status: "200",
              data: giftsLS,
            }),
          // Wait 500ms to simulate a typical API behaviour
          500,
        );
      } catch (error) {
        reject({
          status: "500",
          data: error,
        });
      }
    }),
  save: (data) =>
    new Promise((resolve, reject) => {
      try {
        localStorage.setItem("gifts", JSON.stringify(data));
        resolve({
          status: "200",
          data,
        });
      } catch (error) {
        reject({
          status: "500",
          data: error,
        });
      }
    }),
};
