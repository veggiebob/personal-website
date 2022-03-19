/**
 * Fetches shader data using the Shadertoy API
 *
 * @returns {Promise<{
 * shaderKey: string,
 * name: string,
 * thumbnail: string,
 * description: string,
 * views: number,
 * likes: number
 * }[]>} Promise returning shader data
 */
export const fetchShadertoyData = async () => {
  const SHADERTOY_APP_KEY = "NtHKMN";
  const shaderData = [];

  try {
    const data = await fetch(
      `https://www.shadertoy.com/api/v1/shaders/query/veggiebob?num=8&sort=newest&key=${SHADERTOY_APP_KEY}`
    );
    const shaderKeys = (await data.json()).Results;
    console.log(shaderKeys);
    await Promise.all(
      shaderKeys.map(async (pkey) => {
        const shaderRes = await fetch(
          `https://www.shadertoy.com/api/v1/shaders/${pkey}?key=${SHADERTOY_APP_KEY}`
        );
        const shader = (await shaderRes.json()).Shader;

        shaderData.push({
          key: pkey,
          thumbnail: `https://www.shadertoy.com/media/shaders/${pkey}.jpg`,
          name: shader.info.name,
          views: shader.info.viewed,
          likes: shader.info.likes,
          description: clipString(
            shader.info.description.replace(/[\n\r]/g, "<br>"),
            200
          ),
        });
      })
    );
    return shaderData;
  } catch (err) {
    console.log(err);
  }
};

const clipString = function (str, len) {
  return str.length > len ? str.substring(0, len) + "..." : str;
};
