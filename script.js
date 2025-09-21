// Array to store memos
let memos = [];
let currentEditingMemo = null;

// Generate random colors for memos
function getRandomColor() {
    const colors = [
        '#FFE5B4', // Peach
        '#FFCCCB', // Light Pink
        '#E0E6FF', // Light Blue
        '#C7CEEA', // Lavender
        '#FFE4E1', // Misty Rose
        '#E6FFE6', // Light Green
        '#FFF8DC', // Cornsilk
        '#F0E68C', // Khaki
        '#DDA0DD', // Plum
        '#98FB98', // Pale Green
        '#F5DEB3', // Wheat
        '#FFA07A', // Light Salmon
        '#20B2AA', // Light Sea Green
        '#87CEEB', // Sky Blue
        '#DEB887'  // Burlywood
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add a new memo
function addMemo() {
    const memo = {
        id: Date.now(),
        content: '',
        color: getRandomColor(),
        created: new Date()
    };
    memos.push(memo);
    updateMemoDisplay();
    goToMemoPage();
}

// Navigate to memo page
function goToMemoPage() {
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('memoPage').style.display = 'block';
    updateMemoDisplay();
}

// Return to main page
function returnToMain() {
    document.getElementById('memoPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
}

// Update memo display
function updateMemoDisplay() {
    const memoGrid = document.getElementById('memoGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (memos.length === 0) {
        memoGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    memoGrid.innerHTML = memos.map(memo => `
        <div class="memo-item" style="background-color: ${memo.color}" onclick="editMemo(${memo.id})">
            <button class="delete-btn" onclick="deleteMemo(event, ${memo.id})">×</button>
            <div class="memo-content">
                ${memo.content || '<span class="memo-placeholder">Click to add content...</span>'}
            </div>
        </div>
    `).join('');
}

// Edit memo content
function editMemo(id) {
    const memo = memos.find(m => m.id === id);
    if (!memo) return;
    
    const newContent = prompt('Edit your memo:', memo.content);
    if (newContent !== null) {
        memo.content = newContent;
        updateMemoDisplay();
    }
}

// Delete memo
function deleteMemo(event, id) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this memo?')) {
        memos = memos.filter(m => m.id !== id);
        updateMemoDisplay();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateMemoDisplay();
});
