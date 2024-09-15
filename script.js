let icon = {
    success: '<span class="material-symbols-outlined">task_alt</span>',
    danger: '<span class="material-symbols-outlined">error</span>',
    warning: '<span class="material-symbols-outlined">warning</span>',
    info: '<span class="material-symbols-outlined">info</span>',
};

const showToast = (message = "Sample Message", toastType = "info", duration = 5000) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";

    let box = document.createElement("div");
    box.classList.add("toast", `toast-${toastType}`, "show");
    box.innerHTML = `
        <div class="toast-content-wrapper">
            <div class="toast-icon">${icon[toastType]}</div>
            <div class="toast-message">${message}</div>
            <div class="toast-progress"></div>
            <button class="toast-close">✖</button>
        </div>
    `;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration = `${duration / 1000}s`;

    // Remove the existing toast
    let existingToasts = document.querySelectorAll(".toast");
    existingToasts.forEach(toast => toast.remove());

    document.body.appendChild(box);

    // Auto-remove after duration
    setTimeout(() => {
        box.classList.add("closing");
        setTimeout(() => box.remove(), 500);
    }, duration);

    // Close button functionality
    box.querySelector(".toast-close").addEventListener("click", () => {
        box.classList.add("closing");
        setTimeout(() => box.remove(), 500);
    });
};

document.querySelectorAll(".custom-toast").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const type = e.target.classList.contains('success-toast') ? 'success' :
                      e.target.classList.contains('danger-toast') ? 'danger' :
                      e.target.classList.contains('info-toast') ? 'info' :
                      'warning';
        showToast(`This is a ${type} message`, type, 5000);
    });
});
