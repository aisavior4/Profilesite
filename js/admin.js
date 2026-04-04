// ===================================
// Admin Initialization
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    loadGalleryData();
    loadStats();
    loadHeroBackground();
    
    // Initialize forms
    initProfileForm();
    initGalleryForm();
});

// ===================================
// Hero Background Management
// ===================================
function loadHeroBackground() {
    const savedBackground = localStorage.getItem('heroBackground');
    if (savedBackground) {
        document.getElementById('heroBackgroundUrl').value = savedBackground;
    }
}

function updateHeroBackground() {
    const backgroundUrl = document.getElementById('heroBackgroundUrl').value;
    
    if (!backgroundUrl) {
        showAlert('배경 이미지 URL을 입력해주세요.', 'error');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('heroBackground', backgroundUrl);
    
    showAlert('배경 이미지가 업데이트되었습니다! 메인 페이지를 새로고침하여 확인하세요.', 'success');
}

// ===================================
// Tab Switching
// ===================================
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

// ===================================
// Alert Messages
// ===================================
function showAlert(message, type = 'success') {
    const alertId = type === 'success' ? 'alertSuccess' : 'alertError';
    const alert = document.getElementById(alertId);
    
    alert.textContent = message;
    alert.classList.add('show');
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
    
    // Scroll to top to show alert
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Stats
// ===================================
async function loadStats() {
    try {
        const response = await fetch('tables/gallery?limit=1000');
        const data = await response.json();
        
        if (data.total) {
            document.getElementById('statGallery').textContent = data.total;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// ===================================
// Profile Management
// ===================================
let currentProfileId = null;

async function loadProfileData() {
    try {
        const response = await fetch('tables/profile?limit=1');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            const profile = data.data[0];
            currentProfileId = profile.id;
            
            document.getElementById('profileName').value = profile.name || '';
            document.getElementById('profileTitle').value = profile.title || '';
            document.getElementById('profileBio').value = profile.bio || '';
            document.getElementById('profileEmail').value = profile.email || '';
            document.getElementById('profilePhone').value = profile.phone || '';
            document.getElementById('profileFacebook').value = profile.facebook || '';
            document.getElementById('profileImage').value = profile.profile_image || '';
        }
    } catch (error) {
        console.error('Error loading profile data:', error);
        showAlert('프로필 데이터를 불러오는데 실패했습니다.', 'error');
    }
}

function initProfileForm() {
    const form = document.getElementById('profileForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const profileData = {
            name: document.getElementById('profileName').value,
            title: document.getElementById('profileTitle').value,
            bio: document.getElementById('profileBio').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value,
            facebook: document.getElementById('profileFacebook').value,
            profile_image: document.getElementById('profileImage').value
        };
        
        try {
            let response;
            
            if (currentProfileId) {
                // Update existing profile
                response = await fetch(`tables/profile/${currentProfileId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profileData)
                });
            } else {
                // Create new profile
                response = await fetch('tables/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...profileData,
                        id: 'profile-1'
                    })
                });
            }
            
            if (response.ok) {
                const result = await response.json();
                currentProfileId = result.id;
                showAlert('프로필이 성공적으로 저장되었습니다!');
            } else {
                throw new Error('Failed to save profile');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            showAlert('프로필 저장에 실패했습니다. 다시 시도해주세요.', 'error');
        }
    });
}

// ===================================
// Gallery Management
// ===================================
let galleryItems = [];

async function loadGalleryData() {
    try {
        const response = await fetch('tables/gallery?limit=1000&sort=order');
        const data = await response.json();
        
        if (data.data) {
            galleryItems = data.data;
            renderGalleryList();
        }
    } catch (error) {
        console.error('Error loading gallery data:', error);
        showAlert('갤러리 데이터를 불러오는데 실패했습니다.', 'error');
    }
}

function renderGalleryList() {
    const galleryList = document.getElementById('galleryList');
    galleryList.innerHTML = '';
    
    if (galleryItems.length === 0) {
        galleryList.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">아직 갤러리 이미지가 없습니다. 새로운 이미지를 추가해보세요!</p>';
        return;
    }
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${item.image_url}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
            <div class="gallery-item-info">
                <h4>${item.title}</h4>
                <p><strong>카테고리:</strong> ${item.category}</p>
                <p><strong>순서:</strong> ${item.order}</p>
                <p>${item.description}</p>
                <div class="gallery-item-actions">
                    <button class="btn btn-secondary" onclick="editGalleryItem('${item.id}')">
                        <i class="fas fa-edit"></i> 수정
                    </button>
                    <button class="btn btn-danger" onclick="deleteGalleryItem('${item.id}')">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
            </div>
        `;
        
        galleryList.appendChild(galleryItem);
    });
}

function initGalleryForm() {
    const form = document.getElementById('galleryForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const galleryData = {
            id: 'gallery-' + Date.now(),
            title: document.getElementById('galleryTitle').value,
            description: document.getElementById('galleryDescription').value,
            image_url: document.getElementById('galleryImageUrl').value,
            category: document.getElementById('galleryCategory').value,
            order: parseInt(document.getElementById('galleryOrder').value)
        };
        
        try {
            const response = await fetch('tables/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(galleryData)
            });
            
            if (response.ok) {
                showAlert('갤러리 이미지가 추가되었습니다!');
                form.reset();
                document.getElementById('galleryOrder').value = '1';
                loadGalleryData();
                loadStats();
            } else {
                throw new Error('Failed to add gallery item');
            }
        } catch (error) {
            console.error('Error adding gallery item:', error);
            showAlert('갤러리 이미지 추가에 실패했습니다.', 'error');
        }
    });
}

function editGalleryItem(itemId) {
    const item = galleryItems.find(g => g.id === itemId);
    
    if (item) {
        document.getElementById('galleryTitle').value = item.title;
        document.getElementById('galleryDescription').value = item.description;
        document.getElementById('galleryImageUrl').value = item.image_url;
        document.getElementById('galleryCategory').value = item.category;
        document.getElementById('galleryOrder').value = item.order;
        
        // Scroll to form
        document.getElementById('galleryForm').scrollIntoView({ behavior: 'smooth' });
        
        showAlert('수정할 내용을 변경한 후 "갤러리 추가" 버튼을 클릭하세요. (현재 항목은 삭제 후 새로 추가됩니다)', 'success');
        
        // Delete the old item first
        deleteGalleryItem(itemId, true);
    }
}

async function deleteGalleryItem(itemId, silent = false) {
    if (!silent && !confirm('정말 이 갤러리 이미지를 삭제하시겠습니까?')) {
        return;
    }
    
    try {
        const response = await fetch(`tables/gallery/${itemId}`, {
            method: 'DELETE'
        });
        
        if (response.ok || response.status === 204) {
            if (!silent) {
                showAlert('갤러리 이미지가 삭제되었습니다.');
            }
            loadGalleryData();
            loadStats();
        } else {
            throw new Error('Failed to delete gallery item');
        }
    } catch (error) {
        console.error('Error deleting gallery item:', error);
        if (!silent) {
            showAlert('갤러리 이미지 삭제에 실패했습니다.', 'error');
        }
    }
}

// ===================================
// Utility Functions
// ===================================

// Image preview
document.addEventListener('DOMContentLoaded', function() {
    const profileImageInput = document.getElementById('profileImage');
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function() {
            const url = this.value;
            if (url) {
                // You can add image preview functionality here
                console.log('Profile image URL:', url);
            }
        });
    }
});