import token from '@/config/index.ts';
import { useStoreMethod } from '/@/utils/publicMethod';
import queryString from 'query-string';
export function getInviteCode() {
  const { address } = useStoreMethod();
  const parsed = queryString.parse(location.search);
  const inviteCode = parsed.inviteCode;
  const code = localStorage.getItem('inviteCode');
  if (!inviteCode) {
    if (code === 'undefined' || code === 'null' || code === '' || !code) {
      localStorage.setItem('inviteCode', token.DEFAULTREFERRERADDRESS);
      address.setInviteAddress(token.DEFAULTREFERRERADDRESS);
    } else {
      address.setInviteAddress(code);
    }
  } else {
    localStorage.setItem('inviteCode', inviteCode as string);
    address.setInviteAddress(inviteCode as string);
  }
}
