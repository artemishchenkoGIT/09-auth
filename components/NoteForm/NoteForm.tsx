'use client';

import { CreateNote } from '@/types/note';
import { useId } from 'react';
import { useMutationNotes } from '@/hooks/useMutationNotes';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api/clientApi';
import { TAGS } from '@/utils/consts';
import css from './NoteForm.module.css';

function NoteForm() {
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const router = useRouter();
  const createNoteMutation = useMutationNotes(
    createNote,
    'created successfully',
    clearDraft
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as CreateNote;
    createNoteMutation.mutate(values);
  };

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          className={css.input}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          name="content"
          id={`${fieldId}-content`}
          rows={8}
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          {TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Creating note...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
