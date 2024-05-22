import neo4j from 'neo4j-driver';

const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USERNAME = process.env.NEO4J_USERNAME;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

const driver = neo4j.driver(
  NEO4J_URI as string,
  neo4j.auth.basic(NEO4J_USERNAME as string, NEO4J_PASSWORD as string)
);

const runQuery = async (query: string, params: any) => {
  const session = driver.session();
  try {
    const result = await session.run(query, params);
    return result.records;
  } catch (error) {
    console.error('Error occurred during database operation:', error);
    throw error;
  } finally {
    await session.close();
  }
};

export default runQuery;
