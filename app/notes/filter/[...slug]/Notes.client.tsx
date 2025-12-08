'use client';

import { useState, useCallback } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.client.module.css';

interface NotesByTagNameClientProps {
  tagName: string | undefined;
}

export const NotesByTagNameClient = ({
  tagName,
}: NotesByTagNameClientProps) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['notes', tagName, debouncedSearch, currentPage],
    queryFn: () => fetchNotes(currentPage, debouncedSearch, tagName),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong. Try again.</p>}
      {!isLoading && !isError && data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onCreated={() => {
              closeModal();
            }}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {isFetching && <p>Updating...</p>}
    </div>
  );
};
