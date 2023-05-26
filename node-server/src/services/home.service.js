
const getHomeContent = () => {
  // Call APIs to get Data or do some async processing
  return new Promise((resolve, reject) => { 
    resolve({ title: 'Home', description: "Page Description" });
  });
}

module.exports = {
  getHomeContent
}