document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('militaryForm');
    const dataTable = document.getElementById('dataTable');
    let data = JSON.parse(localStorage.getItem('militaryData')) || [];
    let editIndex = null;

    // Sana pickerni ishga tushirish
    $('#datepicker').datepicker({
        format: 'dd.mm.yyyy',
        language: 'uz',
        autoclose: true,
        todayHighlight: true
    });

    // Ma'lumotlarni jadvalga chiqarish
    function renderTable() {
        dataTable.innerHTML = '';
        
        // Boshqarmalar bo'yicha guruhlash
        const groupedData = {};
        data.forEach(item => {
            if (!groupedData[item.department]) {
                groupedData[item.department] = [];
            }
            groupedData[item.department].push(item);
        });
        
        // Har bir boshqarma uchun alohida bo'lim yaratish
        Object.keys(groupedData).forEach((department, deptIndex) => {
            // Boshqarma sarlavhasi
            const headerRow = document.createElement('tr');
            headerRow.className = 'department-header';
            headerRow.innerHTML = `
                <td colspan="6">${department}</td>
            `;
            dataTable.appendChild(headerRow);
            
            // Boshqarma ostidagi harbiylar
            groupedData[department].forEach((item, index) => {
                const row = document.createElement('tr');
                row.className = 'department-row';
                
                row.innerHTML = `
                    <td>${deptIndex + 1}.${index + 1}</td>
                    <td>${item.rank}</td>
                    <td>${item.fullname}</td>
                    <td>${item.birthdate}</td>
                    <td>${item.comment || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2 edit-btn" data-index="${data.indexOf(item)}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-btn" data-index="${data.indexOf(item)}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                dataTable.appendChild(row);
            });
        });

        // Tahrirlash va o'chirish tugmalari
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', editData);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteData);
        });
    }

    // Formani yuborish
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newData = {
            department: document.getElementById('department').value.trim(),
            rank: document.getElementById('rank').value,
            fullname: document.getElementById('fullname').value.trim(),
            birthdate: document.getElementById('birthdate').value,
            comment: document.getElementById('comment').value.trim()
        };

        // Validatsiya
        if (!newData.department || !newData.rank || !newData.fullname || !newData.birthdate) {
            alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
            return;
        }

        if (editIndex !== null) {
            // Tahrirlash
            data[editIndex] = newData;
            editIndex = null;
        } else {
            // Yangi qo'shish
            data.push(newData);
        }

        // Saqlash va yangilash
        localStorage.setItem('militaryData', JSON.stringify(data));
        renderTable();
        
        // Formani tozalash va modalni yopish
        form.reset();
        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
        
        // Yangilashni kafolatlash
        location.reload();
    });

    // Ma'lumotni tahrirlash
    function editData(e) {
        const index = e.target.closest('button').getAttribute('data-index');
        const item = data[index];
        
        document.getElementById('department').value = item.department;
        document.getElementById('rank').value = item.rank;
        document.getElementById('fullname').value = item.fullname;
        document.getElementById('birthdate').value = item.birthdate;
        document.getElementById('comment').value = item.comment || '';
        
        editIndex = index;
        new bootstrap.Modal(document.getElementById('addModal')).show();
    }

    // Ma'lumotni o'chirish
    function deleteData(e) {
        if (confirm('Bu ma\'lumotni rostdan ham o\'chirmoqchimisiz?')) {
            const index = e.target.closest('button').getAttribute('data-index');
            data.splice(index, 1);
            localStorage.setItem('militaryData', JSON.stringify(data));
            renderTable();
            location.reload();
        }
    }

    // Dastlabki jadvalni yuklash
    renderTable();
});