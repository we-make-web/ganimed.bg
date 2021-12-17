import React, { useEffect, FC, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import { Icon } from '@/components';
const bootstrap = typeof window !== `undefined` && import('bootstrap');

const Ctx = React.createContext(null);

export const ToastProvider: FC = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);
  const container = React.useRef(null);

  useEffect(() => {
    const containerEl = container.current;

    const handleHidden = (e) => {
      const id = e.target.dataset.id;
      const newToasts = toasts.filter((t) => t.id !== id);
      setToasts(newToasts);
    };

    containerEl.addEventListener('hidden.bs.toast', handleHidden);
    return () => {
      containerEl.removeEventListener('hidden.bs.toast', handleHidden);
    };
  }, [toasts]);

  useEffect(() => {
    if (!toasts.length) {
      return;
    }

    let hasUpdate = false;

    const newToasts = toasts.map((toast) => {
      const toastEl = toast.ref.current;
      if (!toast.bootstrapToast && toastEl) {
        bootstrap?.then(({ Toast }) => {
          toast.bootstrapToast = new Toast(toastEl);
          toast.bootstrapToast.show();
          hasUpdate = true;
        });
      }

      return toast;
    });

    if (hasUpdate) {
      setToasts(newToasts);
    }
  }, [toasts]);

  const openToast = useCallback((content, type) => {
    const id = uuidv4();
    const toast = {
      content,
      type,
      id,
      ref: React.createRef(),
      bootstrapToast: null,
    };

    setToasts((toasts) => [...toasts, toast]);
  }, []);

  return (
    <Ctx.Provider value={{ openToast }}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3" ref={container}>
        {toasts.map(({ content, id, ref, type }) => {
          const isDanger = type === 'danger';
          const isSuccess = type === 'success';
          return (
            <div
              className={cx(
                'toast toast align-items-center text-white border-0',
                { 'bg-success': isSuccess },
                { 'bg-danger': isDanger },
              )}
              key={id}
              ref={ref}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-id={id}
            >
              <div className="d-flex">
                <div className="toast-body">
                  <Icon
                    size={isSuccess ? 24 : 18}
                    className={'me-3'}
                    name={isSuccess ? 'check-circle-fill' : 'exclamation-diamond-fill'}
                  />
                  {content}
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
};

export const useToasts = () => React.useContext(Ctx);
