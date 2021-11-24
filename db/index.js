const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealer_books_web"
);

const Book = conn.define("book", {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
  });

const Author = conn.define("author", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});


Book.belongsTo(Author, { as: "author"});
Author.hasMany(Book, { as: "authored", foreignKey: "authorId" });

const syncAndSeed = async () => {
  try{
    await conn.sync({ force: true });
  const [bdw, tsi, mao, debt, stalin, spanish, jobs] = await Promise.all(
    [
      "Billion Dollar Whale",
      "The Sovereign Individual",
      "Mao: The Unknown Story",
      "Debt: The First 5,000 Years",
      "Stalingrad: The Fateful Siege: 1942-1943",
      "The Battle for Spain: The Spanish Civil War 1936-1939",
      "Bullshit Jobs: A Theory",
    ].map((title) => Book.create({ title }))
  );
  const [brad, james, jon, david, antony] = await Promise.all(
    [
      "Bradley Hope and Tom Wright",
      "James Dale Davidson and Lord William Rees-Moog",
      "Jon Halliday and Jung Chang",
      "David Graeber",
      "Antony Beevor",
    ].map((name) => Author.create({ name }))
  );
  bdw.authorId = brad.id;
  tsi.authorId = james.id;
  mao.authorId = jon.id;
  debt.authorId = david.id;
  stalin.authorId = antony.id;
  spanish.authorId = antony.id;
  jobs.authorId = david.id;
  await Promise.all([bdw.save(), tsi.save(), mao.save(), debt.save(), stalin.save(), spanish.save(), jobs.save()]);
} catch(ex){
    console.log(ex)
}
};

module.exports = {
  conn,
  syncAndSeed,
  models: { Author, Book },
};
