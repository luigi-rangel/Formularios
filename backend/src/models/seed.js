const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
(async function main() {
  try {
    await prisma.user.create({
        data: {
          name: "Luigi",
          password: "root"
        }
    });
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();