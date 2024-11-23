export const responseWrapper = (req, res, next) => {
  const originalJson = res.json;

  res.json = function (data) {
    let wrappedData = data;
    if (!data?.hasOwnProperty('error')) {
      wrappedData = {};

      if (res?.meta) {
        wrappedData.meta = res.meta;
      }

      wrappedData.payload = data;
    }

    return originalJson.call(this, wrappedData);
  }

  next();
}
