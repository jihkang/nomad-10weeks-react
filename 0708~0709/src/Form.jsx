import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { contryState } from './utils';

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [_, setContries] = useRecoilState(contryState);
  const value = watch('contry_name');

  const onSubmit = (e) => {
    setContries((prev) => [
      ...prev,
      {
        contry: value,
        state: 'visited',
      },
    ]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('contry_name', { required: true })} />
      {errors['contry_name']?.type === 'required' && (
        <p role="alert">contry name is required</p>
      )}
      <button type="submit">추가하기</button>
    </form>
  );
}
