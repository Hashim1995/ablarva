import { dictionary } from '@/utils/constants/dictionary';

const Status = [
  {
    color: '#ffbb28',
    dataKey: 'Pending',
    label: dictionary.en.pending
  },
  {
    color: '#ff8042',
    dataKey: 'Returned',
    label: dictionary.en.returned
  },
  {
    color: '#0088fe',
    dataKey: 'Approved',
    label: dictionary.en.agreed
  },
  {
    color: '#000000',
    dataKey: 'Completed',
    label: dictionary.en.termination
  },
  {
    color: '#00c49f',
    dataKey: 'Assigned',
    label: dictionary.en.signed
  },
  {
    color: '#6f2da8',
    dataKey: 'Expired',
    label: dictionary.en.overdue
  },
  {
    color: '#ef233c',
    dataKey: 'Rejected',
    label: dictionary.en.canceled
  }
];

export { Status };
