import styled from 'styled-components';

const StyledLoading = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

export default function Loading() {
  return <StyledLoading>Loading ..</StyledLoading>;
}
