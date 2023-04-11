import { prisma } from '@/config';

function findAll() {
  return prisma.ticketType.findMany();
}

function findById(id: number) {
  return prisma.ticketType.findUnique({
    where: {
      id,
    },
  });
}

const ticketTypeRepository = {
  findAll,
  findById,
};

export default ticketTypeRepository;
