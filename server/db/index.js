import { PrismaClient,Prisma } from '@prisma/client'
const prisma = new PrismaClient({
    datasources:{
        db:{
            url:process.env.DATABASE_URL
        },
    },
    
    transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
      },
})
export {prisma}