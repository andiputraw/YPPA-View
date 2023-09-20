<script>
    export let isOpen = false;
  
    function closeModal() {
      isOpen = false;
    }
  </script>
  
  {#if isOpen}
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="modal-overlay"></div>
  
      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            class="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M13.06 4.94a.75.75 0 0 0-1.06-1.06L9 7.94 6.06 5.01a.75.75 0 0 0-1.06 1.06L7.94 9l-2.93 2.93a.75.75 0 0 0 1.06 1.06L9 10.06l2.93 2.93a.75.75 0 0 0 1.06-1.06L10.06 9l2.93-2.93z"
            ></path>
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>
  
        <!-- Modal content goes here -->
        <div class="modal-content py-4 text-left px-6">
          <slot></slot>
        </div>
      </div>
    </div>
  {/if}
  