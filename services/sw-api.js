export async function getData(url) {
  try {
    let response = await fetch(url);
    if (response.ok) {
      const json = await response.json();

      return json;
    }
  } catch (error) {
    console.log(error);
  }
}
