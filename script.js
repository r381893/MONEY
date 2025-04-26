/* === V2 樣式開始 === */
.form-container.v2 {
  max-width: 400px;
  margin: 20px auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.form-container.v2 h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn, .cancel-btn {
  width: 48%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

/* 手機版 RWD */
@media (max-width: 480px) {
  .form-container.v2 {
    width: 90%;
  }

  .button-group {
    flex-direction: column;
  }

  .save-btn, .cancel-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
/* === V2 樣式結束 === */
