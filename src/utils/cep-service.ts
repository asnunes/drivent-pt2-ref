import { request } from './request';
import { ViaCEPAddress } from '@/protocols';

async function getAddress(cep: string): Promise<ViaCEPAddress> {
  const result = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
  return result.data;
}

export { getAddress };
