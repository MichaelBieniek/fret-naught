import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: center;
`;

function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  return <div>TBI</div>;
}
