import { useForm } from "react-hook-form";

export function AddClient() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Nom du client</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        placeholder="Nom du client"
        ref={register({ required: true })}
      />
      <label htmlFor="contact">Contact du client</label>
      <input
        type="text"
        name="contact"
        id="contact"
        required
        placeholder="+"
        ref={register({ required: true })}
      />
      <label htmlFor="description">Description des colis </label>
      <textarea name="description" id="description"></textarea>
      <select className="realeseBox" ref={register({ required: true })}>
        <option value="yes">Liberer </option>
        <option value="no">Garder</option>
      </select>
      <input type="submit" value="Creer" />
    </form>
  );
}
