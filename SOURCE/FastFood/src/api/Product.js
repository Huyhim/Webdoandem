import Promise from "bluebird";
import Alamofire from "../lib/Alamofire";
import Config from "../config/env";
/**
 *Retrieve careers
 *
 * @param
 * @returns
 */
export const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.products}`;

    return Alamofire.request(url, "GET", {}, {})
      .then(response => {
        // console.log('res getCategories' + response)
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};

export const getProduct = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.products}${"/" +
      id}`;
    return Alamofire.request(url, "GET", {}, {})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};
// https://github.com/diegohaz/rest/blob/master/generators/app/templates/api/user/model.js#L129
// params -> localhost:9000/products?page=1&limit=1
export const queryProduct = ({ page, limit, query }) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.products}` +
      `${page ? "?page=" + page : ""}` +
      `${limit ? "&limit=" + limit : ""}` +
      `${query ? query : ""}`;

    return Alamofire.request(
      url,
      "GET",
      {},

      {}
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const searchProduct = ({ page, limit, query }) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.products}` +
      `${page ? "?page=" + page : ""}` +
      `${limit ? "&limit=" + limit : ""}` +
      `${query ? "&q=" + query : ""}`;

    return Alamofire.request(
      url,
      "GET",
      {},

      {}
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const createProduct = ({
  name,
  highlight,
  image,
  price,
  status,
  description,
  category,
  type,
  topBuy
}) => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.products}`;

    return Alamofire.request(
      url,
      "POST",
      {
        name,
        highlight,
        image,
        price,
        status,
        description,
        category,
        type,
        topBuy
      },

      {}
    )
      .then(response => {
        console.log("res1111" + JSON.stringify(response));
        resolve(response);
      })
      .catch(err => {
        console.log("errr" + JSON.stringify(err));
        reject(err);
      });
  });
};

export const updateProduct = ({
  id,
  name,
  highlight,
  image,
  price,
  status,
  description,
  category,
  type,
  topBuy
}) => {
  return new Promise((resolve, reject) => {
    const url =
      `${Config.api.host.base}${Config.api.path.base.products}` + "/" + id;

    return Alamofire.request(
      url,
      "PUT",
      {
        name,
        highlight,
        image,
        price,
        status,
        description,
        category,
        type,
        topBuy
      },

      {}
    )
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteProduct = id => {
  return new Promise((resolve, reject) => {
    const url = `${Config.api.host.base}${Config.api.path.base.products}${"/" +
      id}`;
    return Alamofire.request(url, "DELETE", {}, {})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        // console.log('errr' + err)
        reject(err);
      });
  });
};
