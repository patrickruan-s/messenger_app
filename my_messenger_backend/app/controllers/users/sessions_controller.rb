# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy

  def create
    resource = User.find_for_database_authentication(email: sign_in_params[:email])
    if resource&.valid_password?(sign_in_params[:password])
      token = SecureRandom.hex(32)
      resource.update(token: token)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password.' }, status: :unauthorized
    end
  end

  def destroy
    token = request.headers['Authorization']&.split(' ')&.last
    User.find_by(token: token)&.update(token: nil)
    render json: { message: 'Logged out successfully.' }, status: :ok
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end
end
